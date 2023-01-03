import AvatarName from '@/components/avatar_name';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { columns } from '@/screens/account_details/components/staking/components/delegations/components/desktop/utils';
import type { ItemType } from '@/screens/account_details/components/staking/components/delegations/types';
import { formatNumber } from '@/utils/format_token';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

type DelegationsRowProps = {
  item: ItemType;
  i: number;
};

const DelegationsRow: FC<DelegationsRowProps> = ({ item, i }) => {
  const { name, address, imageUrl } = useProfileRecoil(item.validator);
  const amount = item.amount ? formatNumber(item.amount.value, item.amount.exponent) : '';
  const commission = item.commission ?? 0;
  const reward = item.reward ? formatNumber(item.reward.value, item.reward.exponent) : '';
  const formattedItem = {
    identifier: i,
    validator: <AvatarName name={name} address={address} imageUrl={imageUrl} />,
    amount: `${amount} ${item.amount?.displayDenom.toUpperCase()}`,
    commission: `${commission} %`,
    reward: `${reward} ${item.reward?.displayDenom.toUpperCase()}`,
  };
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.key} align={column.align} style={{ width: `${column.width}%` }}>
          {formattedItem[column.key as keyof typeof formattedItem]}
        </TableCell>
      ))}
    </TableRow>
  );
};

type DesktopProps = {
  className?: string;
  items?: ItemType[];
};

const Desktop: FC<DesktopProps> = ({ className, items }) => {
  const { t } = useTranslation('accounts');

  return (
    <div className={classnames(className)}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                style={{ width: `${column.width}%` }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((x, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <DelegationsRow key={`${x.validator}-${i}`} i={i} item={x} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
