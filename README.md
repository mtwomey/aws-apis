# aws-profile

## Installation (Requires NodeJs >= 12)

`npm i -g mtwomey/aws-profile#v0.0.1` (or whatever version tag)

## Description

Working with multiple AWS profiles often means your commands need to specify additional flags to indicate the profile you want to use. In addition, not all "things" that make use of your AWS credentials configured in `~/.aws` have a flag to select a profile (e.g. some things insist on only using the profile named "default").

This tool will overwrite your default profile with a named profile of your choosing.

## General use

Show info and list profiles:

```
# aws-profile
Default profile currently resembles "acme-dev-env"

"aws-profile [profile-name]" to set the default profile to match a given profile.

Possible profiles:

acme-dev-env
acme-prod-env
jjcust-env
```

Set default to match a given profile:

```
# aws-profile jjcust-env
Default profile now matches profile "jjcust-env"
```

## Help

`aws-profile -h`
