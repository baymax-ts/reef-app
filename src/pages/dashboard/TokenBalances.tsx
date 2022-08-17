import { Token } from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React, { useContext } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TokenPricesContext from '../../context/TokenPricesContext';
import TokenCard from './TokenCard';
import { CREATE_ERC20_TOKEN_URL } from '../../urls';

interface TokenBalances {
  tokens: Token[];
}

export const Skeleton = (): JSX.Element => (
  <div className="token-card token-card--skeleton">
    <div className="token-card__wrapper">
      <div className="token-card__main">
        <div className="token-card__image" />
        <div className="token-card__info">
          <div className="token-card__token-info">
            <span className="token-card__token-name" />
          </div>
          <div className="token-card__token-price" />
        </div>
      </div>
    </div>
  </div>
);

const CreateTokenButton = (): JSX.Element => (
  <Link
    to={CREATE_ERC20_TOKEN_URL}
    type="button"
    className="dashboard__tokens-create-btn"
  >
    <Uik.Icon icon={faPlus} />
    <span>Create Own Token</span>
  </Link>
);

export const TokenBalances = ({ tokens }: TokenBalances): JSX.Element => {
  const tokenPrices = useContext(TokenPricesContext);

  const tokenCards = tokens
    .filter(({ balance }) => balance.gt(0))
    .map((token) => (
      <TokenCard
        key={token.address}
        token={token}
        price={tokenPrices[token.address] || 0}
      />
    ));

  return (
    <div className="dashboard__tokens">
      {
        tokens.length === 0
          ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )
          : (
            <>
              { tokenCards }
              <CreateTokenButton />
            </>
          )
      }
    </div>
  );
};
