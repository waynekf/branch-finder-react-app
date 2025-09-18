import { Branch } from './Branch';

function Branches(props: { branches: Branch[] }) {
  return (
    <ul>
      {props.branches.map((branch, i) => {
        return (
          <li>
            {i}.{branch.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Branches;
