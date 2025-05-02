import React from "react";
import Feature from "../Features/Feature";
import { MdGppGood, MdLibraryAddCheck, MdLock, MdShare } from "react-icons/md";

const Features = () => {
  return (
    <div className="features-wrapper">
      <div className="title-large">Amazing Features</div>
      <div className="title-small">
        Some basic features of Blockchain
      </div>

      <div className="mobile-wrapper">
        <div>
          <Feature title="Immutability" icon={<MdLock />} align="right">
            <p>
              Immutability means something that can’t be changed or altered.
              This is one of the top blockchain features that help to ensure
              that the technology will remain as it is, a permanent, unalterable
              network.
            </p>
          </Feature>
        </div>

        <div className="mobile-container">
          <img src="/mobile.png" alt="mobile" />
        </div>

        <div>
          <Feature title="Enhanced Security" icon={<MdGppGood />} align="left">
            <p>
            Enhanced security in blockchain refers to advanced measures that strengthen the protection of data and transactions within the network. Blockchain is already known for its strong security, but newer techniques make it even more resistant to cyber threats.

            </p>
          </Feature>
        </div>
        <div>
          <Feature title="Decentralized" icon={<MdShare />} align="right">
            <p>
            Decentralization is the process of transferring control and decision-making from a central authority to multiple smaller units or local offices. Instead of one single organization making all the decisions, power is distributed among different levels, allowing for more independence and flexibility. This approach is commonly used in governments, businesses, and technology to improve efficiency and responsiveness.

            </p>
          </Feature>
        </div>
        <div>
          <Feature
            title="Distributed Ledger"
            icon={<MdLibraryAddCheck />}
            align="left"
          >
            <p>
            A distributed ledger is a type of database that is shared across multiple computers (nodes) instead of being stored in a single central location. This means that every participant in the network has a copy of the ledger, and any updates or changes are synchronized across all copies. Unlike traditional centralized databases, where a single authority controls the data, distributed ledgers ensure transparency, security, and decentralization.

            </p>
          </Feature>
        </div>
      </div>
    </div>
  );
};

export default Features;
