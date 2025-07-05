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
          set -e

          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 22

          node -v
          npm -v
          npm install
        '''
      }
    }

    stage('Run Playwright Tests') {
        steps {
            sh '''
            set -e

            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            nvm use 22

            node -v
            npm -v

            npm install
            npm run test:e2e
            '''
        }
    }

    stage('Build App') {
      steps {
        sh '''
          set -e

          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 22

          node -v
          npm -v

          npm run build
        '''
      }
    }
  }
}
