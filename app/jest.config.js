module.exports = {
    "testMatch": [
        "**/*.steps.js"
      ],
      "moduleFileExtensions": [
        "js"
      ],
      "preset": "ts-jest",
      "transform": {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      "moduleNameMapper":{
        "\\.(css|less|sass|scss)$": "<rootDir>/test/CSSStub.js",
        // "\\.(gif|ttf|eot|svg)$": "<rootDir>/test/fileMock.js"
   }
}