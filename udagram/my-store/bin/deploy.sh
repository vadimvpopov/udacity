aws s3 cp --recursive --acl public-read ./dist/my-store/browser/ s3://vp-fswd-19800928/
aws s3 cp --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./dist/my-store/browser/index.html s3://vp-fswd-19800928/
# aws s3 sync dist/my-app/browser s3://your-bucket-name --acl public-read
