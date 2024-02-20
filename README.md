# gumbo-audio-api
Develop a Proof of Concept (PoC) for an Audio Processing backend service capable of isolating vocals, melody, and instrumentals from uploaded audio files. The PoC should demonstrate the feasibility and scalability of the technology.


`1. AWS Instance create`
   
   Sign into AWS
   
   Go to the EC2 tab using Search box and choose the region depending on your needs.
   
   Click the button `Launch Instances`.

   In the next tab, you can config the Instance information such as Name, System type, System Version, Instance Type, Hardware Size...
   
   You must create the pem file for accessing the Instance. If you finish the configuration, you can click the Buttion `Launch`

`2. Access to Instance`
   
   You can access the Instance using VPS

   In the instances tab, you can select the Instance you want to access. and click the buttion `Connect`
   
   In the `connect to see instance` tab, you can access using ssh client command or Ec2 instance connect.
   
   If you use the SSH client,  you can use this command syntax: `ssh -i "xxx.pem" xxx.compute.amazonaws.com`
   
   So, you can create the instance and access to is using over process.

`3. Building environment`
   
   Clone the repository from github and go to the directory and enter the such command `npm i`
   
   And you can configure the ex.env file and rename to .env and use `npm start` command for starting the server
   
   If you want to restart, stop command and start server
