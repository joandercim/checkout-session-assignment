import { motion, useAnimationControls } from 'framer-motion';
import { IOrder } from '../models/IOrder';
import { useState } from 'react';

interface IOrderProps {
  order: IOrder;
}

const PrevOrder = ({ order }: IOrderProps) => {
  const [toggled, setToggled] = useState(false);

  const accordionControls = useAnimationControls();
  const liControls = useAnimationControls();

  const orderItems = order.products.data;

  const toggleAccord = () => {
    if (toggled === false) {
      setToggled(true);
      accordionControls.start('open');
      liControls.start('visible');
    } else {
      setToggled(false);
      accordionControls.start('collapsed');
      liControls.start('hidden');
    }
  };

  const toggleVariants = {
    collapsed: {
      height: '50px',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    open: {
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  const liVariants = {
    hidden: {
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0.4,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  };

  return (
    <div>
      <motion.li
        initial="collapsed"
        variants={toggleVariants}
        animate={accordionControls}
        id={order.timestamp.replace(' ', '')}
        className={`px-2 mt-3 w-full border-b-2 overflow-hidden`}
        key={order.timestamp}
      >
        <div className="accordion-top flex justify-between items-center mb-4">
          <h2 className="w-[40%] inline font-semibold">
            Orderdatum: {order.timestamp.split(' ')[0]}
          </h2>
          <span>{order.payment_status === 'paid' ? 'Betald' : 'Obetald'}</span>
          <span className="w-48">{order.total} SEK</span>
          <button
            onClick={() => {
              toggleAccord();
            }}
            className="border py-1 px-3 bg-gray-100 rounded-lg hover:border-gray-400"
          >
            Visa mer
          </button>
        </div>
        <div className="accordion-bottom">
          <motion.ul
            initial="hidden"
            variants={liVariants}
            animate={liControls}
            className="pb-4"
          >
            <li className="flex justify-between px-1">
              <span className="w-40">Namn</span>
              <span className='w-40'>Pris</span>
              <span className="w-40 text-right">Antal</span>
            </li>
            {order.products.data.map((item, index) => (
              <li key={index} className="flex justify-between bg-gray-100 my-2 p-1">
                <span className="w-40">{item.description}</span>
                <span className='w-40'>{+item.price.unit_amount / 100} kr</span>
                <span className="w-40 text-right">{+item.quantity}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.li>
    </div>
  );
};
export default PrevOrder;
