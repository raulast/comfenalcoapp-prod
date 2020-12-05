import React from 'react'

export default function TableUsers(props) {

    const desbloquear = (u) => {
        props.handleDesbloquear(u.target.id)
    }
    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        const name = u.target.name.split('/')
        props.handleEdition(u.target.id, name[0], name[1], name[2])
    }
    const users = props.users;
        console.log('RAUL', users);
    const userTypes = ["Admin", "Médico","Auxiliar Pemel","Admin Pemel","Admin IPS","Usuarios Admin"]
    return (
        <tbody>
            {Object.keys(users).map((key) => (
                users[key]['session'] == 'banned' ? (
                    <tr className="text-danger" key={key}><td></td><td>{users[key]['name']}</td><td>{users[key]['email']}</td><td>{userTypes[users[key]['tipo']]}</td>
                        <td><button className="btn btn-info btn-sm" id={users[key]['id']} onClick={desbloquear}><i className="fas fa-user-slash"></i></button></td>
                        <td><button className="btn btn-warning btn-sm" id={users[key]['id']} name={users[key]['name']+'/'+users[key]['email']+'/'+users[key]['tipo']} onClick={editar}><i className="far fa-edit"></i></button></td>
                        <td><button className="btn btn-danger btn-sm" id={users[key]['id']} onClick={eliminar}><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                    ): (
                    <tr key={key}><td></td><td>{users[key]['name']}</td><td>{users[key]['email']}</td><td>{userTypes[users[key]['tipo']]}</td>
                        <td><button className="btn btn-warning btn-sm" id={users[key]['id']} name={users[key]['name']+'/'+users[key]['email']+'/'+users[key]['tipo']} onClick={editar}><i className="far fa-edit"></i></button></td>
                        <td><button className="btn btn-danger btn-sm" id={users[key]['id']} onClick={eliminar}><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                    )
            ))}
        </tbody>

    );

}
