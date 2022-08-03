const activeStyle = {
  color: 'white',
};

const inActiveStyle = {
  color: '#8585AD',
};

export const onActiveLink = ({ isActive }: { isActive: boolean }) => (isActive ? activeStyle : inActiveStyle);
