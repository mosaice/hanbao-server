const baseConfig = {
  type: 'mysql',
  entities: ['ORM/entity/**/*.ts'],
  migrations: ['ORM/migration/**/*.ts'],
  subscribers: ['ORM/subscriber/**/*.ts'],
}

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
    debug: true,
    trace: true,
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
      type: "redis",
      options: {
          host: "localhost",
          port: 6379
      },
      duration: 60000
    },
    synchronize: false
  }
}

export default () => {
  const ENV: string = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  return ormconfig[ENV];
}
