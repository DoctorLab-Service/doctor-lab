import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '<URL_OF_YOUR_GRAPHQL_API>',
    documents: ['src/**/*.tsx', 'src/**/ *.graphql'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            presetConfig: {
                gqlTagName: 'gql',
            },
            // config: {
            //     gqlImport: 'graphql.macro#gql'
            // },
        }
    },
    ignoreNoDocuments: true,
}

export default config