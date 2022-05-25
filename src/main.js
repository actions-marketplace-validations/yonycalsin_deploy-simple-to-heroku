const { execSync } = require('child_process')
const core = require('@actions/core')

function createNetrcFileCommand(config) {
  const { heroku_api_key, heroku_email } = config

  return `cat > ~/.netrc <<EOF
  machine api.heroku.com
      login ${heroku_email}
      password ${heroku_api_key}
  machine git.heroku.com
      login ${heroku_email}
      password ${heroku_api_key}
  EOF`
}

async function main() {
  try {
    execSync(createNetrcFileCommand(config), {
      stdio: 'inherit',
    })

    core.info('Successfully logged into heroku')
  } catch (error) {
    core.setFailed(error.toString())
  }
}

main()
