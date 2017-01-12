import C, { fclause, cat, or, shape, isStr, isBool,
  isFclause,
  isArray, isFn, and, isNum, isNull, isUndefined, isProblem } from '../';
import { any, ExprClause, CatFnClause, OrFnClause, AndFnClause,
  CollOfClause, collOf, ClauseClause, PredClause, DelayedClauseClause, ClauseRefClause,
  ZeroOrMoreFnClause, OneOrMoreFnClause, ZeroOrOneFnClause } from '../core';
import { WallFnClause } from '../core/wall';
import { ShapeFnClause, MapOfFnClause } from '../core/regex';
import { isNamespacePath, GetNSFnClause, NamespaceFnClause, MetaFnClause, SetNSFnClause, NamespaceObjClause, ResolveFnClause } from './namespace.types';

// TODO
// const C = Clause.withRegistry(nsObj);

const DescribeFnClause = fclause( {
  args: cat(
     'expression', C( 'clause.types/Expression' ),
    'replacer', C.zeroOrOne( fclause( {
      args: cat( ExprClause ),
      ret: or( isUndefined, isNull, collOf( isStr ) ),
    } ) ),
    'space', C.zeroOrOne( C.isNatInt ) ),
  ret: isStr,
} );

const SingleArgPredClause = () => fclause( {
  args: cat( 'x', any() ),
  ret: isBool,
} );

const IsUuidFnClause = fclause( {
  args: cat( 'x', or( isStr, any ) ),
  ret: isBool,
} );

const AnyClause = fclause( {
  ret: ClauseClause,
} );

const FclauseClause = isFclause;

const SCatFnClause = fclause( {
  args: cat( 'string', isStr ),
  ret: ClauseClause,
} );

const FclauseFnClause = fclause( {
  args: cat( shape( {
    optional: {
      args: and( isArray, C( 'clause.types/Expression' ) ),
      ret: C( 'clause.types/Expression' ),
      fn: fclause( {
        args: cat(
          'conformedArguments', C.zeroOrMore( any ),
          'conformedReturnValue', any
        ),
        ret: any
      } ),
    }
  } ) ),
} );

const clauseTransformFnClause = () => fclause( {
  args: cat( ExprClause ),
  ret: ClauseClause,
} );

const InstanceOfFnClause = fclause( {
  args: cat( 'instanceType', isFn ),
  ret: SingleArgPredClause(),
} );

const NotFnClause = fclause( {
  args: cat( 'predicateToNegate', C( 'clause.types/Predicate' ) ),
  ret: SingleArgPredClause(),
} );

const EqualsFnClause = fclause( {
  args: cat( 'valueToCompareWith', any() ),
  ret: SingleArgPredClause(),
} );

const OneOfFnClause = fclause( {
  args: cat( 'valueOptions', collOf( C( 'clause.types/Primitive' ) ) ),
  ret: SingleArgPredClause(),
} );

const PrimitiveClause = or( isStr, isNum, isBool, isNull, isUndefined );

const EnforceFnClause = fclause( {
  args: cat( 'expression', ExprClause, 'valueToCheck', any() ),
  ret: isUndefined
} );

const ConformFnClause = fclause( {
  args: cat( 'expression', ExprClause, 'valueToConform', any() ),
  ret: or( 'conformedValue', any(), 'problem', C( 'clause.types/Problem' ) ),
} );

const DelayedFnClause = fclause( {
  args: cat( 'getFn', fclause( {
    ret: ExprClause,
  } ) ),
  ret: DelayedClauseClause,
} );

C( '/clause', NamespaceFnClause );

C( 'clause.compose/cat', CatFnClause );
C( 'clause.compose/or', OrFnClause );
C( 'clause.compose/zeroOrMore', ZeroOrMoreFnClause );
C( 'clause.compose/oneOrMore', OneOrMoreFnClause );
C( 'clause.compose/zeroOrOne', ZeroOrOneFnClause );
C( 'clause.compose/and', AndFnClause );
C( 'clause.compose/collOf', CollOfClause );
C( 'clause.compose/mapOf', MapOfFnClause );
C( 'clause.compose/shape', ShapeFnClause );
C( 'clause.compose/any', AnyClause );
C( 'clause.compose/wall', WallFnClause );
C( 'clause.compose/fclause', FclauseFnClause );
C( 'clause.compose/nullable', clauseTransformFnClause() );
C( 'clause.compose/undefinable', clauseTransformFnClause() );
C( 'clause.compose/maybe', clauseTransformFnClause() );

C( 'clause.compose.string/sCat', SCatFnClause );

C( 'clause.utils/enforce', EnforceFnClause );
C( 'clause.utils/conform', ConformFnClause );
C( 'clause.utils/delayed', DelayedFnClause );
C( 'clause.utils/describe', DescribeFnClause );

C( 'clause.preds/not', NotFnClause );
C( 'clause.preds/isObj', SingleArgPredClause() );
C( 'clause.preds/isPlainObj', SingleArgPredClause() );
C( 'clause.preds/isStr', SingleArgPredClause() );
C( 'clause.preds/isArray', SingleArgPredClause() );
C( 'clause.preds/isDate', SingleArgPredClause() );
C( 'clause.preds/isNull', SingleArgPredClause() );
C( 'clause.preds/isUndefined', SingleArgPredClause() );
C( 'clause.preds/notEmpty', SingleArgPredClause() );
C( 'clause.preds/isBool', SingleArgPredClause() );
C( 'clause.preds/isFn', SingleArgPredClause() );
C( 'clause.preds/isNum', SingleArgPredClause() );
C( 'clause.preds/isInt', SingleArgPredClause() );
C( 'clause.preds/isNatInt', SingleArgPredClause() );
C( 'clause.preds/isUuid', IsUuidFnClause );
C( 'clause.preds/oneOf', OneOfFnClause );
C( 'clause.preds/equals', EqualsFnClause );
C( 'clause.preds/instanceOf', InstanceOfFnClause );

C( '/clause.namespace/set', SetNSFnClause );
C( '/clause.namespace/get', GetNSFnClause );
C( '/clause.namespace/resolve', ResolveFnClause );
C( '/clause.namespace/meta', MetaFnClause );

C( 'clause.types/Expression', ExprClause );
C( 'clause.types/Clause', ClauseClause );
C( 'clause.types/FClause', FclauseClause );
C( 'clause.types/Predicate', PredClause );
C( 'clause.types/DelayedClause', DelayedClauseClause );
C( 'clause.types/ClauseReference', ClauseRefClause );
C( 'clause.types/Problem', isProblem );
C( 'clause.types/NamespaceObj', NamespaceObjClause );
C( 'clause.types/NamespacePath', isNamespacePath );
C( 'clause.types/Primitive', PrimitiveClause );

export default C.getRegistry();
