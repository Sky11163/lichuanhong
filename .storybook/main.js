module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-actions',
        '@storybook/addon-links',
    ],
    webpackFinal: async config => {
        console.log(2222)
        config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve("react-docgen-typescript-loader"),
                options: {
                    shouldExtractLiteralValuesFromEnum: true,
                    propFilter: (prop) => {
                        console.log(prop, 1111)
                        if (prop.parent) {
                            console.log(prop.parent, 222)
                            return !prop.parent.fileName.includes('node_modules')
                        }
                        return true            
                    }
                }
            }
        ]
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
};
