const db = require('../../config/db')

module.exports = {
    usuario(perfil) {
        return db('usuarios')
            .join(
                'usuarios_perfis',
                'usuarios.id',
                'usuarios_perfis.usuario_id'
            )
            .where({ perfil_id: perfil.id })
    }
}