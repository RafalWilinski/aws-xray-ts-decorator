import XRayInstrumented from "../src/library";

class MyTestClass {
  @XRayInstrumented({})
  simpleMethod(input: number): number {
    return input * 48;
  }

  @XRayInstrumented({})
  simpleThrowMethod(): number {
    throw new Error("simpleThrowMethod throws!");
  }

  @XRayInstrumented({})
  simplePromiseMethod(input: number): Promise<number> {
    return new Promise(resolve => {
      console.log("--- MyTestClass.simplePromiseMethod started!");

      setTimeout(() => {
        console.log("--- MyTestClass.simplePromiseMethod ended!");

        resolve(input * 312);
      }, 1000);
    });
  }

  @XRayInstrumented({})
  simplePromiseRejectableMethod(input: number): Promise<number> {
    return new Promise(() => {
      console.log("--- MyTestClass.simplePromiseRejectableMethod started!");

      setTimeout(() => {
        throw new Error("This is expected failure!");
      }, 1000);
    });
  }
}

describe("XRay Decorator", () => {
  const testInstance = new MyTestClass();

  test("normal method returns value", async done => {
    expect(testInstance.simpleMethod(2)).toBe(96);
    done();
  });

  test("sync method throws error", async done => {
    expect(() => testInstance.simpleThrowMethod()).toThrow();
    done();
  });

  test("async method resolves value", async done => {
    expect(await testInstance.simplePromiseMethod(3)).toBe(936);
    done();
  });

  test("faulty async throws error", async done => {
    expect(testInstance.simplePromiseRejectableMethod(4)).rejects.toEqual(
      new Error("This is expected failure!")
    );
    done();
  });
});
