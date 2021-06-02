import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'umi';

import styles from './styles.less';

type BuildingFiltersPropsType = {
  city: string | undefined;
  setCity: (value: string | undefined) => void;
  status: string | undefined;
  setStatus: (value: string | undefined) => void;
  clearCurrentStatus: () => void;
};

const intlName = 'buildingList';

const BuildingFilters: React.FC<BuildingFiltersPropsType> = (props) => {
  const { city, setCity, status, setStatus, clearCurrentStatus } = props;
  const intl = useIntl();

  const handleCitySelect = (value: string) => {
    clearCurrentStatus();
    setCity(value);
  };

  const handleCityClear = () => {
    clearCurrentStatus();
    setCity(undefined);
  };

  const handleStatusSelect = (value: string) => {
    clearCurrentStatus();
    setStatus(value);
  };

  const handleStatusClear = () => {
    clearCurrentStatus();
    setStatus(undefined);
  };

  return (
    <div className={styles.filterList}>
      <div className={styles.filterFlex}>
        <Select
          className={styles.select}
          showSearch
          placeholder={intl.formatMessage({ id: `${intlName}.cityFilterPlaceHolder` })}
          optionFilterProp="children"
          filterOption={(input, option) =>
            // @ts-ignore
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={city}
          onSelect={handleCitySelect}
          allowClear
          onClear={handleCityClear}
        >
          <Select.Option value="Beijing">
            {intl.formatMessage({ id: `${intlName}.beijing` })}
          </Select.Option>
          <Select.Option value="Shanghai">
            {intl.formatMessage({ id: `${intlName}.shanghai` })}
          </Select.Option>
          <Select.Option value="Guangzhou">
            {intl.formatMessage({ id: `${intlName}.guangzhou` })}
          </Select.Option>
          <Select.Option value="Shenzhen">
            {intl.formatMessage({ id: `${intlName}.shenzhen` })}
          </Select.Option>
          <Select.Option value="Hong Kong">
            {intl.formatMessage({ id: `${intlName}.hongkong` })}
          </Select.Option>
          <Select.Option value="Taipei">
            {intl.formatMessage({ id: `${intlName}.taipei` })}
          </Select.Option>
          <Select.Option value="Hangzhou">
            {intl.formatMessage({ id: `${intlName}.hangzhou` })}
          </Select.Option>
          <Select.Option value="Nanjing">
            {intl.formatMessage({ id: `${intlName}.nanjing` })}
          </Select.Option>
          <Select.Option value="Chengdu">
            {intl.formatMessage({ id: `${intlName}.chengdu` })}
          </Select.Option>
          <Select.Option value="Chongqing">
            {intl.formatMessage({ id: `${intlName}.chongqing` })}
          </Select.Option>
          <Select.Option value="Xi'an">
            {intl.formatMessage({ id: `${intlName}.xian` })}
          </Select.Option>
        </Select>
        <Select
          className={styles.select}
          showSearch
          placeholder={intl.formatMessage({ id: `${intlName}.statusFilterPlaceHolder` })}
          optionFilterProp="children"
          filterOption={(input, option) =>
            // @ts-ignore
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={status}
          onSelect={handleStatusSelect}
          allowClear
          onClear={handleStatusClear}
        >
          <Select.Option value="Active">
            {intl.formatMessage({ id: `${intlName}.active` })}
          </Select.Option>
          <Select.Option value="Exited">
            {intl.formatMessage({ id: `${intlName}.exited` })}
          </Select.Option>
          <Select.Option value="Complete">
            {intl.formatMessage({ id: `${intlName}.complete` })}
          </Select.Option>
          <Select.Option value="Potential">
            {intl.formatMessage({ id: `${intlName}.potential` })}
          </Select.Option>
          <Select.Option value="On Hold">
            {intl.formatMessage({ id: `${intlName}.onhold` })}
          </Select.Option>
          <Select.Option value="Canceled">
            {intl.formatMessage({ id: `${intlName}.canceled` })}
          </Select.Option>
        </Select>
      </div>
      {/* <Select
        className={styles.select}
        showSearch
        placeholder="Program Type"
        optionFilterProp="children"
        filterOption={(input, option) =>
          // @ts-ignore
          option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="WeWork">WeWork</Select.Option>
        <Select.Option value="PxWe">PxWe</Select.Option>
        <Select.Option value="Turn Key">Turn Key</Select.Option>
      </Select> */}
    </div>
  );
};

export default BuildingFilters;
