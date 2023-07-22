import {Badge, Button, Card, TextInput, Title} from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import {useState} from 'react'

export function CreateNewUser(){
    const {addUser} = useUserActions()
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if(!name || !email || !github){
            return setResult('ko')
        }

        addUser({name, email, github})
        setResult('ok')
        form.reset()
    }

    return (
        <Card style={{marginTop: '16px'}}>
            <Title>Create New User</Title>
            <form onSubmit={handleSubmit} className=''>
                <TextInput name='name' placeholder='Escribe el nombre'/>
                <TextInput name='email' placeholder='Escribe el email'/>
                <TextInput name='github' placeholder='Escribe el usuario de Github'/>

                <div>
                    <Button type='submit' style={{marginTop:'16px'}}>
                        Crear usuario
                    </Button>
                    <span>
                        {result === 'ok' && <Badge style={{backgroundColor:'#29E100', fontWeight:'bold', borderRadius: '10px'}} color='green'>Guardado correctamente</Badge> }
                        {result === 'ko' && <Badge style={{backgroundColor:'#E12C00', fontWeight:'bold', borderRadius: '10px'}} color='red'>Error en algún campo</Badge> }
                    </span>
                </div>
            </form>
        </Card>
    )
}