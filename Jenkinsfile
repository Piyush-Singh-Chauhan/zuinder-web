 pipeline {
        agent {
            label 'nextjs'
        }
        environment {
            PROJECT_NAME = '$PROJECT_NAME'
            BUILD_NUMBER = '$BUILD_NUMBER'
            BUILD_STATUS = '#' 
            CUSTOM_BUILD_URL = '$BUILD_URL'
        }
        stages {
            stage("Collecting Requirements") {
                steps {
                    sh "echo Please wait.."
                    sh "sudo npm i"
                }
            }
            
            stage("Build") {
                steps {
                
                    sh "sudo npm run build"
                }
            }
            stage("Deploy") {
            steps {
                sh '''
                PM2_STATUS=$(sudo pm2 status)
                if echo "$PM2_STATUS" | grep -q 'uber-landing-2104'; then
                    echo "PM2 service is already running. Restarting..."
                    sudo pm2 restart uber-landing-2104
                else
                    echo "PM2 service is not running. Starting..."
                    sudo PORT=2104 pm2 start npm --name uber-landing-2104 -- start
                    echo "landing-uberlikeapp.mobiloitte.io"
                fi
                '''
            }
        }
        /* stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('mobiloitte-sonar') {
                    script {
                        def scannerHome = tool 'mobiloitte-sonar-scanner';
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        } */
    }
        post {
            always {
                script {
                    // Update BUILD_STATUS based on build result
                    def buildOutcome = currentBuild.resultIsBetterOrEqualTo('SUCCESS') ? 'SUCCESS' : 'FAILURE'
                    BUILD_STATUS = buildOutcome

                    emailext to: 'de-anil@mobiloitte.com,team-it@mobiloitte.com,re-shiwani@mobiloitte.com',
                            subject: 'PROJECT BUILD STATUS via JENKINS',
                            body: """<html>
                                        <head>
                                            <style>
                                                .build-status {
                                                    color: ${BUILD_STATUS == 'SUCCESS' ? 'green' : 'red'};
                                                }
                                            </style>
                                        </head>
                                        <body>
                                            <p>Hello,</p>
                                            <b><p>This notification is to inform you about your project's build has been $BUILD_STATUS .</p></b>
                                            <ul>
                                                <li><strong>Project Name:</strong> $PROJECT_NAME</li>
                                                <li><strong>Build Status:</strong> <span class="build-status">$BUILD_STATUS</span></li>
                                                <li><strong>Build Number:</strong> $BUILD_NUMBER</li>
                                                  <b><p> Please click on the URL to check sonar report of your project !!</p></b>
                                            <li><strong>SonarQube Report:</strong> http://172.16.0.200:9000/dashboard?id=
development-copy-trading-24094232-nextjs</li>
                                                <li><strong>Build Log:</strong> <b><p>Attached Below</p></b></li>
                                            </ul>
                                        </body>
                                    </html>""",
                            mimeType: 'text/html',
                            attachLog: true
                }
            }
        }
    }
