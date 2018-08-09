# website-contentful-data-transfer

Standalone script that fetched up-to-date info from associated services (Meetup, YouTube) and creates new Contentful entries as necessary

Deployed on Lambda via serverless.

`npm run deploy` to deploy

In case of errors `SLS_DEBUG=* npm run deploy`

Updating credentials `sls config credentials --provider aws --key {key} --secret {secret} -o`
