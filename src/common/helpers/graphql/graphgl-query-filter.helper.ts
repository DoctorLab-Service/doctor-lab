import { string } from '../string'

export const graphQLQueryFilter = (value: any) => {
    if (!!value && !!value.req) {
        if (!!value.req.body) {
            const { query, operationName, variables } = value.req.body
            const arrQuery = String(query).split(/\bmutation |query \b/g)
            const input = {}
            arrQuery.forEach(el => {
                let strInput = []
                if (operationName !== undefined) {
                    if (string.trim(el.split(/[{,(]/g)[0]) === operationName.toLowerCase()) {
                        strInput = el
                            .split(/\binput: {\b/g)[1]
                            .split(/[}]/g)[0]
                            .split(/[,]/g)
                    }
                } else {
                    if (el.split(/\binput: {\b/g)[1] !== undefined) {
                        strInput = el
                            .split(/\binput: {\b/g)[1]
                            .split(/[}]/g)[0]
                            .split(/[,]/g)
                    }
                }
                strInput.length &&
                    strInput.forEach(e => {
                        const arr = e.split(/[:]/g).map(el => {
                            const cArr = el.replace(/["]/g, '').split(' ')
                            if (!cArr[0].length) {
                                return cArr.slice(1).join(' ')
                            } else {
                                return cArr.join(' ')
                            }
                        })
                        input[arr[0]] = arr[1]
                    })
            })
            return input
        }
    }
    return value
}
