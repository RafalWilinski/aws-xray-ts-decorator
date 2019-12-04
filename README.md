<h1 align="center">AWS X-Ray Typescript Decorator</h1>
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
  myClassMethodWithInstrumentationArgs(input: number): Promise<number> {
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
