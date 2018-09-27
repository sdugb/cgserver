import os, sys
import time
import paramiko
import json

class ProgressBar:
    def __init__(self, count = 0, total = 0, width = 50):
        self.count = count
        self.total = total
        self.width = width

    def move(self):
        self.count += 1

    def log(self, s):
        sys.stdout.write(' ' * (self.width + 9) + '\r')
        sys.stdout.flush()
        print s
        progress = self.width * self.count / self.total
        sys.stdout.write('{0:3}/{1:3}: '.format(self.count, self.total))
        sys.stdout.write('#' * progress + '-' * (self.width - progress) + '\r')
        if progress == self.width:
            sys.stdout.write('\n')
        sys.stdout.flush()

class SSHClient:
    def __init__(self, hostname, port, username, password):
        self.client = paramiko.SSHClient()
        self.client.load_system_host_keys()
        self.client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.client.connect(hostname=hostname, port=port, username=username, password=password)
        self.sftp = paramiko.SFTPClient.from_transport(self.client.get_transport())

    def pwd(self):
        cmd = 'pwd'
        stdin, stdout, stderr = self.client.exec_command(cmd)
        result = stdout.read()
        print result
        return result

    def cd(self, dir):
        cmd = 'cd ' + dir
        stdin, stdout, stderr = self.client.exec_command(cmd)
        result = stdout.read()
        return result

    def mkdir(self, dir):
        try:
            self.sftp.stat(dir)
            return
        except IOError:
            #print("not exist")
            cmd = 'mkdir ' + dir
            stdin, stdout, stderr = self.client.exec_command(cmd)
            #  print 'stderr =', stderr
            result = stdout.read()
            #print 'reslut =', result

    def dockerCompose(self, param):
        cmd = 'docker-compose ' + param;
        print 'cmd =', cmd
        stdin, stdout, stderr = self.client.exec_command(cmd)
        result = stdout.read()
        print result

    def dockerBuild(self, name, dir):
        cmd = 'docker build -t ' + name + ' ' + dir
        print 'cmd =', cmd
        stdin, stdout, stderr = self.client.exec_command(cmd)
        result = stdout.read()
        print result

    def dockerRun(self, param):
        cmd = 'docker run ' + param;
        print 'cmd =', cmd
        stdin, stdout, stderr = self.client.exec_command(cmd)
        #print 'stderr =', stderr
        result = stdout.read()
        print result

    def tar(self, param):
        cmd = 'tar ' + param;
        print 'cmd =', cmd
        stdin, stdout, stderr = self.client.exec_command(cmd)
        timeout = 30
        endtime = time.time() + timeout
        while not stdout.channel.eof_received:
            time.sleep(1)
            if time.time() > endtime:
                stdout.channel.close()
                break
        stdout.read()

    def ls(self):
        cmd = 'ls -l /home'
        stdin, stdout, stderr = self.client.exec_command(cmd)
        #print 'stderr =', stderr
        result = stdout.read()
        print result

    def unzip(self, file):
        dir = os.path.dirname(file)
        cmd = 'unzip -o ' + file + ' -d ' + dir
        print 'cmd =', cmd
        stdin, stdout, stderr = self.client.exec_command(cmd)
        result = stdout.read()
        #print 'reslut =', result

    def sed(self, oldString, newString, file, replaceChar):
        cmd = 'sed -i "s' + replaceChar + oldString + replaceChar + newString + replaceChar + 'g" ' + file
        print 'cmd =', cmd
        stdin, stdout, stderr = self.client.exec_command(cmd)
        result = stdout.read()
        #print 'reslut =', result

    def put(self, srcFile, desFile):
        #self.bar = ProgressBar(total = 10)
        #self.sftp.put(srcFile, desFile, callback=self.printTotals)
        self.sftp.put(srcFile, desFile)

    def get(self, srcFile, desFile):
        self.sftp.get(desFile, srcFile)

    def printTotals(self, transferred, toBeTransferred):
        #print "Transferred: {0}\tOut of: {1}".format(transferred, toBeTransferred)
        
        l = 10.0 * transferred / toBeTransferred
        i = int(l)
        print transferred, toBeTransferred, l, i
        #self.bar.move()
        #self.bar.log('We have arrived at: ' + str(i + 1))

    def close(self):
        self.sftp.close()
        self.client.close()
