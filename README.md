# AWS X-Ray Typescript Decorator

Tired of using `AWSXRay.captureAsyncFunc` and/or `AWSXRay.capturePromise` polluting the body of your methods? Instrument your class methods with this simple decorator which wraps Promise or async function.

<p>
  <a href="https://github.com/RafalWilinski/aws-xray-ts-decorator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://twitter.com/rafalwilinski">
    <img alt="Twitter: rafalwilinski" src="https://img.shields.io/twitter/follow/rafalwilinski.svg?style=social" target="_blank" />
  </a>
</p>

> Instrument your Promises with AWS X-Ray in Typescript with elegant decorators

## Install

```sh
yarn add aws-xray-ts-decorator
```

or with NPM

```sh
npm install aws-xray-ts-decorator --save
```

## Usage

```java
class MyTestClass {
  // All of these arguments are optional
  @XRayInstrumented({
    segmentName: "customSegmentName", // by default it's name of called function
    metadata: { // Add custom metadata as StringMap
      memberId: "1"
    },
    annotations: { // Add custom annotations as StringMap
      context: "this is important!"
    },
    forceCreateSegment: true, // Creates new AWSXRay.Segment if such is not created yet
    addParamsMetadata: true // Adds function parameters as metadata of subsegment
  })
  someAsyncMethod(input: number): Promise<any> {
    ...
  }
}
```

For more details, see [example](https://github.com/RafalWilinski/aws-xray-ts-decorator/blob/master/examples/index.ts).

## Author

👤 **Rafal Wilinski &lt;raf.wilinski@gmail.com&gt;**

- Twitter: [@rafalwilinski](https://twitter.com/rafalwilinski)
- Github: [@RafalWilinski](https://github.com/RafalWilinski)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/RafalWilinski/aws-xray-ts-decorator/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Rafal Wilinski &lt;raf.wilinski@gmail.com&gt;](https://github.com/RafalWilinski).<br />
This project is [MIT](https://github.com/RafalWilinski/aws-xray-ts-decorator/blob/master/LICENSE) licensed.
