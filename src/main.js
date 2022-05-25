const core = require('@actions/core')

async function main() {
  try {
    core.setOutput('status', 'Successfully deployed app')
  } catch (error) {
    core.setFailed(error.toString())
  }
}

main()
