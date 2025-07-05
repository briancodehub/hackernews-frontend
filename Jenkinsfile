pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/briancodehub/hackernews-frontend.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 22
          node -v
          npm install
        '''
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh '''
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 22
          npm run test:e2e
        '''
      }
    }

    stage('Build App') {
      steps {
        sh '''
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 22
          npm run build
        '''
      }
    }
  }
}
