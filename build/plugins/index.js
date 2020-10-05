import commonPlugins from './common';
import productionPlugins from './production';
import developmentPlugins from './development';

const plugins = commonPlugins;

switch (process.env.BUILD) {
    case 'development':
        plugins.push(...developmentPlugins);
        break;
    case 'production':
        plugins.push(...productionPlugins);
        break;
}

export default plugins;
