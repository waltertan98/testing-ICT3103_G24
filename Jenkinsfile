// pipeline {
//     agent any

//     stages {
//         stage('Checkout SCM') {
//             steps {
//                 git branch: 'main', changelog: false, poll: false, url: 'https://github.com/marcusohx/ICT3103_G24.git'
//             }
//         }
        
//         // Check for vulnerabilities in git repo against OWASP.
//         stage('OWASP Dependency-Check') {
//             steps {
//                 dependencyCheck additionalArguments: '--format HTML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
//             }
//         }
//     }
// }
pipeline {
    agent any
    stages {
        stage ('Checkout') {
            steps {
                git branch:'main', url: 'https://github.com/waltertan98/testing-ICT3103_G24.git'
            }
        }
        stage('Code Quality Check via SonarQube') {
            steps {
                script {
                def scannerHome = tool 'SonarQube';
                    withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=OWASP -
                    Dsonar.sources=."
                    }
                }
            }
        }
    }
    post {
        always {
        recordIssues enabledForFailure: true, tool: sonarQube()
        }
    }
}
