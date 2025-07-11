pipeline {
    agent any

    environment {
        // Docker Hub image name
        DOCKER_IMAGE = "your-dockerhub-username/node-docker-demo:latest"
        // EC2 deployment details
        SSH_USER = "ec2-user"             // Change to 'ubuntu' for Ubuntu EC2 instances
        SSH_HOST = "your-ec2-public-ip"
        // Jenkins credentials IDs
        DOCKER_CREDS = "dockerhub-creds"  // Docker Hub credentials in Jenkins
        SSH_KEY = "ec2-ssh-key"           // EC2 SSH key credentials in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "✅ Cloning source code from Git..."
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                dir('app') {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo "📦 Logging in and pushing image to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "🚀 Deploying app to EC2 server..."
                sshagent(["${SSH_KEY}"]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << 'EOF'
                        echo "📥 Pulling latest Docker image..."
                        docker pull $DOCKER_IMAGE

                        echo "🛑 Stopping old container (if running)..."
                        docker stop node-docker || true
                        docker rm node-docker || true

                        echo "🏃‍♂️ Starting new container..."
                        docker run -d --name node-docker -p 80:3000 $DOCKER_IMAGE
                    EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Visit http://$SSH_HOST to see your app."
        }
        failure {
            echo "❌ Deployment failed. Please check logs for details."
        }
    }
}
