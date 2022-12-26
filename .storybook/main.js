module.exports = {
    addons: [
        '@storybook/addon-knobs/register',
        '@storybook/addon-notes/register-panel',
        '@storybook/addon-storysource',
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app"
    ],
    stories: ['../src/**/*.stories.tsx'],
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [{
                loader: require.resolve('ts-loader'),
            },
            // Optional
            {
                loader: require.resolve('react-docgen-typescript-loader'),
            },
            ],
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
};