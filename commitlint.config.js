module.exports = {
  extends: ['gitmoji'],
  rules: {
    'type-enum': [1, 'never'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(:\w*:)(?:\s)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    },
  },
}
