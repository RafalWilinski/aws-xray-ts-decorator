import { Segment, getSegment, getLogger, captureAsyncFunc } from "aws-xray-sdk";

interface StringMap {
  [key: string]: string;
}

type InstrumentDecoratorFactoryArgsType = {
  segmentName?: string;
  metadata?: StringMap;
  annotations?: StringMap;
  forceCreateSegment?: boolean;
  addParamsMetadata?: boolean;
};

const InstrumentDecoratorFactory = ({
  segmentName,
  metadata,
  annotations,
  forceCreateSegment,
  addParamsMetadata
}: InstrumentDecoratorFactoryArgsType) => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    const subsegmentName = segmentName || methodName;
    const logger = getLogger();
    let segment;

    try {
      segment = getSegment();
    } catch (error) {
      logger.warn("Failed to get segment!");
    }

    if (!segment && !forceCreateSegment) {
      logger.warn("There is no X-Ray Segment so cannot create subsegment, instrumentation ignored");
      return descriptor;
    }

    if (forceCreateSegment) {
      segment = new Segment(`${subsegmentName}_Segment`);
    }

    if (typeof descriptor.value !== "function") {
      return descriptor;
    }

    // Wrap descriptor with X-Ray instrumentation
    descriptor.value = function(...args: any[]) {
      try {
        return captureAsyncFunc(subsegmentName, async (subsegment: any) => {
          if (addParamsMetadata) {
            args.forEach((arg: any, index: number) => {
              subsegment.addMetadata(
                `param_${index}`,
                typeof arg === "string" || typeof arg === "number"
                  ? arg
                  : JSON.stringify(arg, null, 2)
              );
            });
          }

          if (metadata) {
            Object.keys(metadata).map((entry: string) => {
              subsegment.addMetadata(entry, metadata[entry]);
            });
          }

          if (annotations) {
            Object.keys(annotations).map((entry: string) => {
              subsegment.add(entry, annotations[entry]);
            });
          }

          // Call the function
          const result = method.apply(this, args);

          // If it's a promise, let it resolve and then close subsegment
          if (result.then) {
            try {
              const returnResult = await result;

              subsegment.close();

              return returnResult;
            } catch (error) {
              subsegment.close(error);

              return error;
            }
          } else {
            subsegment.close();
            return result;
          }
        });
      } catch (error) {
        logger.warn(`Failed to instrument ${subsegmentName}`, error);

        return descriptor;
      }
    };

    return descriptor;
  };
};

export default InstrumentDecoratorFactory;
