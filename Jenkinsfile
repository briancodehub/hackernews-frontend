pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/briancodehub/hackernews-frontend.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright install'
        sh 'npm run test:e2e'
      }
      post {
        always {
          junit '**/playwright-report/*.xml'
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }

    stage('Build App') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed.'
    }
  }
}
