module.exports = {
  name: 'portfolio',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/portfolio',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
