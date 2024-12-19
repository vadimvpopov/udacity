python3 -m pip install virtualenv
git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup.git
python3 'aws-elastic-beanstalk-cli-setup/scripts/ebcli_installer.py'
echo 'export PATH="~/.ebcli-virtual-env/executables:$PATH"'
eb --version
