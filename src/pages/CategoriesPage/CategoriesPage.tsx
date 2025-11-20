import { useState } from 'react';
import {
  ShoppingCart,
  Home,
  Heart,
  Palette,
  Dumbbell,
  Bus,
  Car,
  Hammer,
  Coffee,
  Sparkles,
  Shirt,
  GraduationCap,
  Gamepad2,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import classNames from 'classnames';
import Button from 'src/components/button/Button.tsx';
import Modal from 'src/components/modal/Modal.tsx';
import styles from 'src/pages/CategoriesPage/CategoriesPage.module.css';

interface CategoryConfig {
  icon: LucideIcon;
  title: string;
  color: string;
}

const categoriesConfig: CategoryConfig[] = [
  { icon: ShoppingCart, title: 'Groceries', color: 'rgba(239, 68, 68, 1)' },
  { icon: Home, title: 'House', color: 'rgba(251, 191, 36, 1)' },
  { icon: Heart, title: 'Health', color: 'rgba(34, 197, 94, 1)' },
  { icon: Palette, title: 'Hobby', color: 'rgba(168, 85, 247, 1)' },
  { icon: Dumbbell, title: 'Sport', color: 'rgba(236, 72, 153, 1)' },
  { icon: Bus, title: 'Transport', color: 'rgba(59, 130, 246, 1)' },
  { icon: Car, title: 'Car', color: 'rgba(180, 83, 9, 1)' },
  { icon: Hammer, title: 'Renovation', color: 'rgba(249, 115, 22, 1)' },
  { icon: Coffee, title: 'Cafes', color: 'rgba(210, 138, 62, 1)' },
  { icon: Sparkles, title: 'Beauty', color: 'rgba(219, 39, 119, 1)' },
  { icon: Shirt, title: 'Clothes', color: 'rgba(20, 184, 166, 1)' },
  { icon: GraduationCap, title: 'Education', color: 'rgba(99, 102, 241, 1)' },
  { icon: Gamepad2, title: 'Leisure', color: 'rgba(6, 182, 212, 1)' },
];

// TODO: refactor when backend is implemented. Need decomposition
const CategoriesPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [newCategories, setNewCategories] = useState<CategoryConfig[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBackgroundColor = (color: string) =>
    color.replace(
      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*1\)/,
      'rgba($1, $2, $3, 0.15)',
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Categories</h1>
        <div className={styles.categoriesGrid}>
          {[...categoriesConfig, ...newCategories].map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selectedIndex === index;

            // Convert rgba to lighter version for background (reduce opacity)
            const backgroundColor = getBackgroundColor(category.color);

            return (
              <div
                key={category.title}
                className={styles.categoryCard}
                onClick={() => setSelectedIndex(isSelected ? null : index)}
              >
                <div
                  className={classNames(styles.iconWrapper, {
                    [styles.highlighted]: isSelected,
                  })}
                  style={{
                    backgroundColor: isSelected
                      ? category.color
                      : backgroundColor,
                  }}
                >
                  <IconComponent
                    size={32}
                    className={styles.icon}
                    style={{
                      color: isSelected ? '#ffffff' : category.color,
                    }}
                  />
                </div>
                <span className={styles.categoryTitle}>{category.title}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        variant='icon'
        className={styles.addButton}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} />
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Add New Category'
      >
        <div>
          <p>Add new category form will go here</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
