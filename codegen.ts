import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: `http://localhost:8000/auth`,
    // schema: 'https://doctor-lab.onrender.com/auth',
    documents: ['src/**/*.tsx', 'src/**/ *.graphql', 'src/**/ *.gql'],
    generates: {
        'src/types/api.d.ts': {
            // preset: 'client',
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            presetConfig: {
                gqlTagName: 'gql',
            },
            config: {
                gqlImport: 'graphql.macro#gql'
            },
        }
    },
    ignoreNoDocuments: true,
}

export default config