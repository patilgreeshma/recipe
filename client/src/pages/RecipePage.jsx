import FloatingVegetables from '../components/FloatingVegetables';

export default function RecipePage({ recipe, onBack, onStartCooking }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFDF0', position: 'relative', overflow: 'hidden' }}>
      <FloatingVegetables />
    </div>
  );
}
