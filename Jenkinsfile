pipeline {
  agent any

  environment {
    CI = 'true'
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/briancodehub/hackernews-frontend.git', branch: 'main'
      }
    }

    stage('Debug PATH') {
      steps {
        sh 'echo $PATH'
        sh 'which npm || true'
        sh 'node -v || true'
        sh 'npm -v || true'
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
