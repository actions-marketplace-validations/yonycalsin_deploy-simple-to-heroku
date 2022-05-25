# Deploy Simple To Heroku

![GitHub issues](https://img.shields.io/github/issues/yonycalsin/deploy-simple-to-heroku.svg)
![GitHub](https://img.shields.io/github/license/yonycalsin/deploy-simple-to-heroku.svg)

This is a simple and concise Github Action, and powerful because **it doesn't wait for the heroku response to finish the action**, **it just pushes the commits and the action finishes**, this is great when you want to save the **minutes** of **github-actions**.

## Getting Started

To get started using the action, just make sure to have a [Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile) in your project and then create a folder called **.github** and inside it, create another folder called **workflows**. Finally inside the workflows folder, create a file called **deploy-to-heroku.yml** with the following contents:

_.github/workflows/deploy-to-heroku.yml_

```yaml
name: Deploy to Heroku

on:
  push:
    branches:
      - master # or main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: yonycalsin/deploy-simple-to-heroku@v2.0.1 # This is the action
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }} # Your account email
          heroku_app_name: "YOUR APP's NAME" # Must be unique in Heroku
```

Now go to your Heroku account and go to Account Settings. Scroll to the bottom until you see API Key. Copy this key and go to your project's repository on GitHub.

In your Repo, go to `Settings -> Secrets` and click on `"New Secret"`. Then enter `HEROKU_API_KEY` as the name and paste the copied `API Key` as the value.

You can now push your project to GitHub and it will be automatically deployed to Heroku henceforth.

You learn more about GitHub Secrets [here](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) and GitHub Actions [here](https://docs.github.com/en/actions)

## Important Notes

- **Please Note**: The default branch to push to is `master`, we plan to support custom branches in the future.
- **Please Note**: While creating a new project on Heroku, **do not** enable the option for **Automatic Deployments** as this would result in an error when the GitHub Action is triggered.
- **Please Note**: Make sure that the application you are trying to deploy already exists in heroku.
- **Please Note**: Note that the action will not wait for the heroku deployment result.
- You can find the secrets tab in your project's settings
- If you're using the above exact workflow code, keep in mind that it deploys whenever you make a change to the master branch (Even README updates which have nothing to do with application code) and that might not be very efficient for you, have a look through the github actions docs to customize when the action should trigger.

  > the mentioned possible solution could also be frustrating, since having two remote repositories (heroku and github), the commit history can be `different/mixed` in each one.

  (I would recommend making a separate dev branch and setting up the action to trigger upon pull request to the master branch)

## Options

The action comes with additional options that you can use to configure your project's behavior on Heroku. You can setup these options under the "with" object as presented above:

| Name            | Required | Description                                                                                    | Example              |
| --------------- | -------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| heroku_api_key  | true     | This will be used for authentication. You can find it in your heroku homepage account settings | \*\*\*               |
| heroku_email    | true     | Email that you use with heroku                                                                 | hello@yonycalsin.com |
| heroku_app_name | true     | The appname to use for deploying                                                               | demo-next-app        |

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/yonycalsin/deploy-simple-to-heroku/blob/master/LICENSE) file for details
