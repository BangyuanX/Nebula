import React, { useState, useEffect } from 'react';
import { List, message, Input, Typography } from 'antd';
import { useIntl } from 'umi';
import InfiniteScroll from 'react-infinite-scroller';
import { getBuildingList } from '@/services/apis';
import BuildingCard from './components/BuildingCard';
import BuildingFilters from './components/BuildingFilters';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';

const intlName = 'buildingList';

const BuildingList: React.FC = () => {
  const [buildingList, setBuildingList] = useState<API.BuildingListBuildingType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [city, setCity] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState<string>();

  const intl = useIntl();

  useEffect(() => {
    async function fetchBuildingList() {
      const res = await getBuildingList({
        page: pageNumber,
        'filter[city]': city,
        'filter[status]': status,
        search: searchText,
      });
      const newList = buildingList.concat(res.data);
      setBuildingList(newList);
      setLoading(false);
      setTotalCount(res.full_count);
    }

    if (pageNumber !== 1) {
      if (buildingList.length === totalCount) {
        setHasMore(false);
        setLoading(false);
        message.warning(intl.formatMessage({ id: `${intlName}.noMoreWarning` }));
        return;
      }
    }

    fetchBuildingList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, searchText, city, status]);

  const handleInfiniteLoad = () => {
    setLoading(true);
    setPageNumber(pageNumber + 1);
  };

  const clearCurrentStatus = () => {
    setPageNumber(1);
    setBuildingList([]);
    setHasMore(true);
  };

  // @ts-ignore
  const handleSearch = (event) => {
    clearCurrentStatus();
    setCity(undefined);
    setStatus(undefined);
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div>
        <Input
          className={styles.searchBar}
          placeholder={intl.formatMessage({ id: `${intlName}.searchPlaceHolder` })}
          allowClear
          prefix={<SearchOutlined />}
          size="large"
          onPressEnter={handleSearch}
        />
        <div className={styles.filterLine}>
          <Typography.Title level={3} className={styles.filterInfo}>
            {totalCount} <span style={{ color: '#1890FF' }}>{status || ''}</span> Buildings Found{' '}
            <span style={{ color: '#1890FF' }}>in {city || 'China'}</span>
          </Typography.Title>
          <BuildingFilters
            city={city}
            setCity={setCity}
            status={status}
            setStatus={setStatus}
            clearCurrentStatus={clearCurrentStatus}
          />
        </div>
      </div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteLoad}
        hasMore={!loading && hasMore}
      >
        <List
          dataSource={buildingList}
          renderItem={(building) => (
            <List.Item key={building.id}>
              <BuildingCard building={building} />
            </List.Item>
          )}
        >
          {loading && hasMore && <div>loading...</div>}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default BuildingList;
