import { IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { person } from 'ionicons/icons';
import { useState } from 'react';
import * as Config from '../constants';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("jose@webjet.com.au");
    const [password, setPassword] = useState<string>("aw3s0m3");
    const backendUrl = `${Config.BACKEND_URL}/Auth/login`

    const login = () => {
        const postData = async () => {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    accessCode: password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            const data = await response.json();
            return data.token;
        };
    
        postData().then(token => {
            localStorage.setItem('jwt', `Bearer ${token}`);
            window.location.href = '/map';
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="10">
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="fixed"> Email</IonLabel>
                                <IonInput
                                    type="email"
                                    value={email}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="fixed"> Password</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonButton expand="block" onClick={login}>Login</IonButton>
                    </IonRow>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Login;
