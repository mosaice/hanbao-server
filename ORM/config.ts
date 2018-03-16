const baseConfig = {
  type: 'mysql',
  charset: 'utf8mb4',
  entities: ['ORM/entity/**/*.ts'],
  migrations: ['ORM/migration/**/*.ts'],
  subscribers: ['ORM/subscriber/**/*.ts'],
};

const ormconfig = {
  dev: {
    ...baseConfig,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '321',
    database: 'hanbao',
    logging: 'all',
    maxQueryExecutionTime: 1000,
    debug: false,
    trace: false,
    synchronize: true,
  },
  prod: {
    ...baseConfig,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '321',
    database: 'hanbao',
    logging: ['query', 'error'],
    maxQueryExecutionTime: 1000,
    cache: {
      type: 'redis',
      options: {
          host: 'localhost',
          port: 6379,
      },
      duration: 60000,
    },
    synchronize: false,
  },
  test: {
    ...baseConfig,
    host: 'localhost',
    port: 3306,
    name: 'TestDB',
    username: 'root',
    password: '321',
    database: 'hanbaoTest',
    logging: ['error'],
    synchronize: true,
    dropSchema : true,
  },
};

export default () => {
  const configMapping = {
    production: ormconfig.prod,
    test: ormconfig.test,
    dev: ormconfig.dev,
  };

  return configMapping[process.env.NODE_ENV!] || ormconfig.dev;
};
