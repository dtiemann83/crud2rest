pipeline {
  agent {
      docker {
          image 'node:carbon' 
          args '-p 3000:3000' 
      }
  }
  environment { 
        CI = 'true'
  }
  stages {
      stage('Build') { 
          steps {
              sh 'npm install' 
          }
      }    
  }
}