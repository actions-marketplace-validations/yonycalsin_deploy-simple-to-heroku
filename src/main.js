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

function addHerokuRemoteCommand(config) {
  const { heroku_app_name } = config

  // GitHub Actions does come with the heroku cli pre-installed
  return `heroku git:remote --app ${heroku_app_name}`
}

function deployToHerokuCommand() {
  // TODO: Add support for other branches
  return `git push heroku master:refs/heads/master`
}

async function main() {
  const config = {
    heroku_api_key: core.getInput('heroku_api_key'),
    heroku_email: core.getInput('heroku_email'),
    heroku_app_name: core.getInput('heroku_app_name'),
  }

  core.debug(`Config: ${JSON.stringify(config)}`)

  try {
    // Check if Repo clone is shallow
    const isShallow = execSync('git rev-parse --is-shallow-repository').toString()

    core.info(`The repo clone is shallow: ${isShallow}`)

    // If the Repo clone is shallow, make it unshallow
    if (isShallow === 'true\n') {
      execSync('git fetch --prune --unshallow', {
        stdio: 'inherit',
      })
    }

    execSync(createNetrcFileCommand(config), {
      stdio: 'inherit',
    })

    core.info('Successfully logged into heroku')

    execSync(addHerokuRemoteCommand(config), {
      stdio: 'inherit',
    })

    core.info('Added git remote heroku')

    await execSync(deployToHerokuCommand(), {
      stdio: 'inherit',
    })

    core.info(`${config.heroku_app_name} successfully deployed on heroku`)
  } catch (error) {
    core.setFailed(error.toString())
  }
}

main()
