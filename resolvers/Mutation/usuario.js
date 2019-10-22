const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        // Implementar
        try {
            const perfilIDs = []

            if (dados.perfis) {
                for (let filtro of dados.perfis) {
                    const perfil = await obterPerfil(_, { filtro })

                if (perfil) {
                    perfilIDs.push(perfil.id)
                }
            }

            delete dados.perfis

            const [ id ] = await db('usuarios')
                .insert(dados)

            for(perfilId of perfilIDs) {
                await db('usuarios_perfis')
                    .insert({
                        perfil_id: perfilId,
                        usuario_id: id
                    })
            }

            return db('usuarios')
                .where({ id })
                .first()
        }

        } catch(error) {
            throw new Error(error)
        }
    },
    async excluirUsuario(_, args) {
        // Implementar
        try {
            const usuario = await obterUsuario(_, args)
            if (usuario) {
                const { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id })
                    .delete()

                await db('usuarios')
                    .where({ id })
                    .delete()
            }

            return usuario

        } catch(error) {
            throw new Error(error)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
        try {
            const usuario = await obterUsuario(_, { filtro })

            if (usuario) {
                const { id } = usuario
                if (dados.perfis) {
                    await db('usuarios_perfis')
                        .where({ usuario_id: id })
                        .delete()
                    for (let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, {
                            filtro }
                        )
                        perfil && await db('usuarios_perfis')
                            .insert({
                                perfil_id: perfil.id,
                                usuario_id: id
                            })
                    }
                }

                delete dados.perfis

                await db('usuarios')
                    .where({ id })
                    .update(dados)

                return { ...usuario, ...dados, }
            }
            return null

        } catch(error) {
            throw new Error(error)
        }
    }
}