// TypeORM
import {
  Equal,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';

const search = (data: string, weight: number) => {
  switch (data) {
    case '<':
      return LessThan(weight);
    case '<=':
      return LessThanOrEqual(weight);
    case '>':
      return MoreThan(weight);
    case '>=':
      return MoreThanOrEqual(weight);
    default:
      return Equal(weight);
  }
};

const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.substr(-2);
  const day = `0${date.getDate()}`.substr(-2);

  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.substr(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export { search, formatDate };
