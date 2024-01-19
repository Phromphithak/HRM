export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName }) {
  console.log('Original Data:', inputData);

  // Map each element with its original index to stabilize the sort order
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  // Sort the stabilized array using the comparator
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  // Map back to the original array based on the sorted order
  inputData = stabilizedThis.map((el) => el[0]);

  // Apply the filter if filterName is provided
  if (filterName) {
    inputData = inputData.filter(
      (user) =>
        user &&
        user.personalInformation.firstName && (
          `${user.personalInformation.firstName} ${user.personalInformation.lastName}`)
        .toLowerCase()
        .includes(filterName.toLowerCase())
    );
  }

  console.log('Filtered Data:', inputData);

  return inputData;
}
