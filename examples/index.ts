import XRayInstrumented from "../src/library";

class MyTestClass {
  @XRayInstrumented({})
  mySimpleMethod(input: number): Promise<number> {
    return new Promise(resolve => {
      console.log("--- MyTestClass.mySimpleMethod started!");

      setTimeout(() => {
        console.log("--- MyTestClass.mySimpleMethod ended!");

        resolve(input * 2);
      }, 1000);
    });
  }

  @XRayInstrumented({
    segmentName: "customSegmentName",
    metadata: {
      memberId: "1"
    },
    annotations: {
      context: "this is important!"
    },
    forceCreateSegment: true,
    addParamsMetadata: true
  })
  myMethodWithInstrumentationArgs(input: number): Promise<number> {
    return new Promise(resolve => {
      console.log("--- MyTestClass.myInstrumentedMethodWithArgs started!");

      setTimeout(() => {
        console.log("--- MyTestClass.myInstrumentedMethodWithArgs ended!");

        resolve(input * 3);
      }, 1000);
    });
  }
}

new MyTestClass().mySimpleMethod(7).then(console.log);
new MyTestClass().myMethodWithInstrumentationArgs(13).then(console.log);
