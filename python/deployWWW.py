import os
import sys
import json

fileName = sys.argv[1]

fp=open(fileName, 'r')
teamInfo = json.load(fp)
fp.close()
print 'jobInfo =', teamInfo
print 'deploy is begin' 


sudoPassword = 'cgs1234'
srcDir = os.path.join(os.getcwd(), 'python/deploy')
srcFile = os.path.join(srcDir, 'nginx.conf')
destFile = teamInfo['WWWPort']
destFile = os.path.join('/usr/local/nginx/cgteam.conf', destFile + '.conf')
print 'destFile =', destFile
commandList = []
commandList.append('cp ' + srcFile + ' ' + destFile)
commandList.append('sed -i "s|PORT|' + str(teamInfo['WWWPort']) + '|g" ' + destFile)
commandList.append('sed -i "s|APIURL|' + teamInfo['apiUrl'] + '|g" ' + destFile)
commandList.append('/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf -s reload')


for command in commandList:
	print 'command =', command
	os.system('echo %s|sudo -S %s' % (sudoPassword, command))