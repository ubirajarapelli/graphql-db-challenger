const db = require('../../config/db')

module.exports = {
    usuarios() {
        // implementar
        return db('usuarios')
    },
    usuario(_, { filtro }) {
        // implementar
        if (filtro) {
            const { id, email } = filtro
            if (id) {
                return db('usuarios')
                    .where({ id })
                    .first()
            }

            if (email) {
                return db('usuarios')
                    .where('email', 'like', '%' + email + '%')
                    .first()
            }
        }
        return null
    },
}